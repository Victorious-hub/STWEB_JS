from django.utils import timezone
import logging
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views import View

from apps.users.models import Affiliate, Agent, CustomUser
from apps.users.utils import get_object

from .decorators import agent_required, client_required, superuser_required
from .models import Answer, CompanyPartners, Contacts, Contract, Coupon, InsuranceObject, InsuranceRisk, InsuranceType, News, Question
from .forms import ContractForm, PolicyForm
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib import messages
from django.db.models import Q

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contacts
from PIL import Image

from .selectors import (
    affiliate_list,
    feedback_list,
    get_answer,
    get_client_contract,
    get_client_contracts,
    get_client_policy,
    get_company_detail,
    get_contracts,
    get_news, 
    incurance_list,
    list_active_coupons,
    list_affiliate_employee,
    list_news, 
    vacancy_list
)

from .utils import (
    client_age_mean, 
    client_age_median, 
    client_age_mode, 
    client_list, 
    get_age, 
    get_cat_info, 
    plot_policy_sale, 
    policy_comleted_list_price, 
)


from .services import (
    apply_coupon_and_pay, 
    contract_create,
    contract_update, 
    policy_create
)

affiliate_logger = logging.getLogger('affiliates')

class ScrollPageView(TemplateView):
    template_name = 'main/scroll_animation.html'

@csrf_exempt
def add_contact(request):
    if request.method == "POST":
        description = request.POST.get('description')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        photo = request.FILES.get('photo')

        if not description or not first_name or not last_name or not email or not phone or not photo:
            return JsonResponse({'success': False, 'error': 'All fields are required.'})

        # Validate the uploaded file is an image
        try:
            img = Image.open(photo)
            img.verify()  # Validate image content
        except Exception:
            return JsonResponse({'success': False, 'error': 'Invalid image file.'})

        # Save contact
        user = CustomUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_staff=True,
            profile_image=photo
        )
        user.save()
        affiliate = Affiliate.objects.create(
            name="Roga i kopita",
            address="some address",
            phone="+375 (29) 111-22-33"
        )
        affiliate.save()
        agent = Agent.objects.create(
            affiliate=affiliate,
            user=user
        )
        agent.save()
        contact = Contacts.objects.create(
            agent=agent,
            description=description
        )
        contact.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid request method.'})

class ContactListView(View):
    template_name = 'main/contacts.html'

    def get(self, request):
        contact_list = Contacts.objects.all()
        return render(request, self.template_name, context={'contacts': contact_list})

@method_decorator(client_required, name='dispatch')
class ContractCreateView(View):
    template_name = 'client_actions/contract_create.html'
    form_class = ContractForm
    success_url = 'client_profile'

    def get(self, request, pk):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, pk):
        form = self.form_class(request.POST)
        if form.is_valid():
            contract = contract_create(pk, form.data)
            if contract:
                affiliate_logger.info(f"Created contract for client: {form.data.get('client')}")
                client_profile_url = reverse(self.success_url, kwargs={'pk': pk})
                return redirect(client_profile_url)
        return render(request, self.template_name, {'form': form})


@method_decorator(client_required, name='dispatch')
class ClientPolicyDetail(View):
    template_name = 'client_actions/policy_detail.html'

    def get(self, request, pk):
        policy = get_client_policy(pk)
        affiliate_logger.info(f"Client policy detail")
        return render(request, self.template_name, context={'policy': policy})


class MainView(View):
    affiliate_logger.info(f"Main page")
    template_name = 'main/main.html'

    def get(self, request):
        news = News.objects.filter().last()
        company_partners = CompanyPartners.objects.all()
        return render(request, self.template_name, context={'news': news, 'company_partners': company_partners})

class CompanyDetailView(View):
    template_name = 'main/company_info.html'

    def get(self, request):
        company = get_company_detail()
        affiliate_logger.info(f"Company page")
        return render(request, self.template_name, context={'company': company})

class PrivacyPolicyDetailView(TemplateView):
    template_name = 'main/privacy.html'

class CouponListView(View):
    template_name = 'main/coupons.html'

    def get(self, request):
        coupon = list_active_coupons()
        affiliate_logger.info(f"Active coupon page")
        return render(request, self.template_name, context={'coupon': coupon})


class QuestionListView(View):
    template_name = 'main/question.html'

    def get(self, request):
        question = Answer.objects.all()
        affiliate_logger.info(f"Question page")
        return render(request, self.template_name, context={'question': question})


class AnswerDetailView(View):
    template_name = 'main/answer.html'

    def get(self, request, pk):
        answer = get_answer(id=pk)
        affiliate_logger.info(f"Answer page")
        return render(request, self.template_name, context={'answer': answer})

class NewsListView(View):
    template_name = 'main/news.html'

    def get(self, request):
        news = list_news()
        affiliate_logger.info(f"News page")
        return render(request, self.template_name, context={'news': news})


class NewsDeailView(View):
    template_name = 'main/news_detail.html'

    def get(self, request, pk):
        news = get_news(pk)
        affiliate_logger.info(f"News page")
        return render(request, self.template_name, context={'news': news})

class VacnacyListView(View):
    template_name = 'main/vacancy.html'

    def get(self, request):
        vacancies = vacancy_list()
        affiliate_logger.info(f"Vacancy list page")
        return render(request, self.template_name, context={'vacancies': vacancies})

class SandboxView(TemplateView):
    template_name = 'main/sandbox.html'

class FeedbackListView(View):
    template_name = 'main/feedback.html'

    def get(self, request):
        feedbacks = feedback_list()
        affiliate_logger.info(f"Feedback list page")
        return render(request, self.template_name, context={'feedbacks': feedbacks})


class InsuranceCatalogDetailView(View):
    template_name = 'main/insurance_catalog_detail.html'

    def get(self, request, pk):
        insurance_risk_list = []
        insurance = InsuranceType.objects.get(id=pk)
        insurance_object_list = InsuranceObject.objects.filter(insurance_type=insurance)
        for i in insurance_object_list:
            insurance_risk = InsuranceRisk.objects.filter(insurance_object=i)
            insurance_risk_list.append(insurance_risk)
        affiliate_logger.info(f"Insurance list page")
        return render(request, self.template_name, 
            context={
                "insurance": insurance,
                "insurance_object_list": insurance_object_list,
                "insurance_risk_list": insurance_risk_list,
            }
        )

class InsuranceListView(View):
    template_name = 'main/insurance_catalog.html'

    def get(self, request):
        insurance = incurance_list()
        affiliate_logger.info(f"Insurance list page")
        return render(request, self.template_name, context={"insurance": insurance})

    def post(self, request):
        insurance_type = request.POST.get('insurance_type')
        if insurance_type:
            insurance = InsuranceType.objects.filter(name=insurance_type)
            return render(request, self.template_name, {'insurance': insurance})
        else:
            insurance_list = incurance_list()
        return render(request, self.template_name, {'insurance': insurance_list})

class AffiliateListView(View):
    template_name = 'main/affiliate_info.html'

    def get(self, request):
        affiliate = affiliate_list()
        affiliate_logger.info(f"Affiliate list page")
        return render(request, self.template_name, context={"affiliate": affiliate})

class AffiliateEmployeeView(View):
    template_name = 'main/affiliate_employee.html'

    def get(self, request, pk):
        affiliate = list_affiliate_employee(pk)
        affiliate_logger.info(f"Affiliate agent list page")
        return render(request, self.template_name, context={"affiliate": affiliate})

@method_decorator(agent_required, name='dispatch')
class PolicyCreateView(View):
    template_name = 'agent_actions/policy_create.html'
    form_class = PolicyForm
    success_url = 'agent_profile'

    def get(self, request, pk):
        contract = get_client_contract(pk)
        form = self.form_class(initial={'contract': contract})
        return render(request, self.template_name, {'form': form})

    def post(self, request, pk):
        form = self.form_class(request.POST)
        if form.is_valid():
            policy = policy_create(pk, form.data)
            if policy:
                affiliate_logger.info(f"Policy for client: {request.user}")
                agent_profile_url = reverse(self.success_url, kwargs={'pk': pk})
                return redirect(agent_profile_url)
        else:
            for _, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{error}")
        return render(request, self.template_name, {'form': form})


@method_decorator(agent_required, name='dispatch')
class AgentContractsListView(View):
    template_name = 'agent_actions/affiliate_contracts.html'
    form_class = ContractForm
    success_url = 'agent_profile'

    def get(self, request, pk):
        contracts = get_client_contracts(pk)
        return render(request, self.template_name, {'contracts': contracts})
    
@method_decorator(client_required, name='dispatch')
class DeleteClientContractView(View):
    template_name = 'client_actions/delete_contract.html'
    success_url = 'client_contracts'

    def get(self, request, pk):
        contract = get_client_contract(pk)
        return render(request, self.template_name, {'contract': contract})

    def post(self, request, pk):
        contract = get_client_contract(pk)
        contract.delete()
        client_contracts = reverse(self.success_url, kwargs={'pk': pk})
        return redirect(client_contracts)


@method_decorator(client_required, name='dispatch')
class UpdateClientContractView(View):
    form_class = ContractForm
    template_name = 'client_actions/update_contract.html'
    success_url = 'client_contracts'

    def get(self, request, pk): 
        contract = get_client_contract(pk)
        form = self.form_class(instance=contract)
        return render(request, self.template_name, {'form': form})

    def post(self, request, pk):
        form = self.form_class(request.POST)
        if form.is_valid():
            contract_update(request.user.id, form.data)
            affiliate_logger.info(f"Register user: {form.data.get('first_name')}-{form.data.get('last_name')}")
            client_contracts = reverse(self.success_url, kwargs={'pk': pk})
        return redirect(client_contracts)

@method_decorator(client_required, name='dispatch')
class ContractSignView(View):
    template_name = 'client_actions/contract_sign.html'
    success_url = 'client_contracts'

    def get(self, request, pk):
        contract = get_client_contract(pk)
        return render(request, self.template_name, {'contract': contract})

    def post(self, request, pk):
        contract = get_client_contract(pk)
        if contract:
            contract.status = 2
            contract.save()
            affiliate_logger.info(f"Signed contract for client: {request.user}")
            client_profile_url = reverse(self.success_url, kwargs={'pk': pk})
            return redirect(client_profile_url)
        return render(request, self.template_name)
    
    
from django.shortcuts import get_object_or_404, render

@method_decorator(agent_required, name='dispatch')
class SearchContractsView(View):
    model = Contract

    def get_template_name(self):
        if self.request.method == 'POST':
            return "agent_actions/affiliate_contracts_sorted.html"
        return 'agent_actions/affiliate_contracts.html'

    def post(self, request, pk):
        searched = request.POST["searched"]
        sort_value = request.POST["sort_value"]
        asc_desc = request.POST["asc_desc"]

        agent = get_object_or_404(Agent, user__id=pk)
        contracts_query = self.model.objects.filter(
            affiliate=agent.affiliate,
            status=2,
        )

        if len(searched) != 0:
            contracts_query = contracts_query.filter(
                Q(client__user__email__icontains=searched) |
                Q(client__user__first_name__icontains=searched) |
                Q(client__user__last_name__icontains=searched)
            )
        print(asc_desc)
        if asc_desc == "asc":
            contracts = contracts_query.order_by(f"client__user__{sort_value}")
        else:
            contracts = contracts_query.order_by(f"-client__user__{sort_value}")
        return render(request, self.get_template_name(), {"searched": searched, "contracts": contracts})


@method_decorator(agent_required, name='dispatch')
class SortContractsView(View):
    model = Contract
    template_search_name = "agent_actions/affiliate_contracts_sorted.html"
    template_name = 'agent_actions/affiliate_contracts.html'

    def post(self, request, pk):
        sort_value = request.POST["sort_value"]
        asc_desc = request.POST["asc_desc"]
        agent: Agent = get_object(Agent, user__id=pk)
        if asc_desc == "asc":
            contracts = self.model.objects.filter(affiliate=agent.affiliate).order_by(f"client__user__{sort_value}")
        else:
            contracts = self.model.objects.filter(affiliate=agent.affiliate).order_by(f"-client__user__{sort_value}")
        return render(request, self.template_search_name, {"sort_value": sort_value, "contracts": contracts})

@method_decorator(client_required, name='dispatch')
class ClientContractListView(View):
    template_name = 'client_actions/client_contracts.html'
    form_class = ContractForm
    success_url = 'client_profile'

    def get(self, request, pk):
        contracts = get_contracts(pk)
        try:
            affiliate_logger.info(f"Client contract list: {request.user}")
            return render(request, self.template_name, {'contracts': contracts})
        except Exception:
            return render(request, self.template_name)


@method_decorator(client_required, name='dispatch')
class ConfirmPolicyCreateView(View):
    template_name = 'client_actions/policy_confirm.html'
    success_url = 'client_profile'

    def get(self, request, pk):
        policy = get_client_policy(pk)
        return render(request, self.template_name, {'policy': policy})

    def post(self, request, pk):
        coupon_code = request.POST.get('coupon')
        policy = get_client_policy(pk)
        success = apply_coupon_and_pay(policy, coupon_code)
        if success:
            affiliate_logger.info(f"Policy successfully confirmed: {request.user}")
            return redirect(reverse('main'))
        else:
            affiliate_logger.info(f"Error to confirm policy: {request.user}")
            messages.error(request, "Coupon is not valid or not enough balance!")
            return render(request, self.template_name, {'policy': policy})

@method_decorator(superuser_required, name='dispatch')
class StatisticsView(View):
    template_name = "statistics/base_statistics.html"

    def get(self, request, pk):
        return render(request, self.template_name)


@method_decorator(superuser_required, name='dispatch')
class CompanyStatisticsView(View):
    template_name = "statistics/company_statistics.html"

    def get(self, request, pk):
        total_clients = client_list()
        total_policy_price = policy_comleted_list_price()
        client_median = client_age_median()
        client_mean = client_age_mean()
        client_mode = client_age_mode()

        return render(
            request, 
            self.template_name, 
            {
                'total_clients': total_clients,
                'total_policy_price': total_policy_price['price__sum'],
                'client_median': client_median,
                'client_mean': client_mean,
                'client_mode': client_mode
            })

@method_decorator(superuser_required, name='dispatch')
class CompanyPolicyChartDetailView(View):
    template_name = "statistics/policy_sale_statistics.html"

    def get(self, request, pk):
        policy_sale_image = plot_policy_sale()
        return render(request, self.template_name, {'policy_sale_image': policy_sale_image})

class CatFactView(View):
    template_name = 'main/cat_fact.html'

    def get(self, request):
        cat_fact = get_cat_info()
        return render(request, self.template_name, context={'cat_fact': cat_fact})

class AgePredictionView(View):
    template_name = 'main/age_prediction.html'

    def get(self, request):
        first_name = self.request.user.first_name
        age = get_age(first_name)
        return render(request, self.template_name, context={'age': age})
