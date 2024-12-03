from django.urls import path
from django.urls import re_path


from .views import (
    AffiliateEmployeeView,
    AffiliateListView,
    AgentContractsListView,
    AnswerDetailView,
    ContactListView,
    InsuranceCatalogDetailView,
    MainView,
    ClientContractListView,
    ClientPolicyDetail,
    CompanyDetailView,
    CompanyPolicyChartDetailView,
    CompanyStatisticsView,
    ConfirmPolicyCreateView, 
    ContractCreateView,
    ContractSignView,
    CouponListView,
    DeleteClientContractView, 
    FeedbackListView, 
    InsuranceListView,
    MainView,
    NewsListView,
    PolicyCreateView,
    PrivacyPolicyDetailView,
    QuestionListView,
    SandboxView,
    ScrollPageView,
    SearchContractsView,
    SortContractsView,
    StatisticsView,
    UpdateClientContractView, 
    VacnacyListView,
    AgePredictionView,
    CatFactView,
    NewsDeailView,
    add_contact,
)


urlpatterns = [
    path('client/contracts/policy/<int:pk>', ConfirmPolicyCreateView.as_view(), name='client_policy'),
    path('client/contracts/<int:pk>', ClientContractListView.as_view(), name='client_contracts'),
    path('policy/create/<int:pk>', PolicyCreateView.as_view(), name='policy_create'),          
    path('create/<int:pk>', ContractCreateView.as_view(), name='contract_create'),
    path('', MainView.as_view(), name='main'),
    path('vacancies/', VacnacyListView.as_view(), name='vacancy_list'),
    path('affiliate/', AffiliateListView.as_view(), name='affiliate_list'),
    path('news/', NewsListView.as_view(), name='news_list'),
    path('feedbacks/', FeedbackListView.as_view(), name='feedback_list'),
    path('insurance/', InsuranceListView.as_view(), name='insurance_list'),
    path('insurance/catalog/<int:pk>', InsuranceCatalogDetailView.as_view(), name='insurance_catalog_detail'),
    path('agent/client/contracts/<int:pk>', AgentContractsListView.as_view(), name='client_contract_list'),
    path('client/policy/detail/<int:pk>', ClientPolicyDetail.as_view(), name='client_policy_detail'),
    path('cat/fact', CatFactView.as_view(), name='cat_fact'),
    path('age/prediction', AgePredictionView.as_view(), name='age_predict'),
    path('contract/search/<int:pk>', SearchContractsView.as_view(), name='search_contracts'),
    path('contract/sort/<int:pk>', SortContractsView.as_view(), name='sort_contracts'),
    path('coupons/', CouponListView.as_view(), name='coupon_list'),
    path('questions/', QuestionListView.as_view(), name='question_list'),
    path('questions/answers/<int:pk>', AnswerDetailView.as_view(), name='answer_detail'),
    path('contract/delete/<int:pk>', DeleteClientContractView.as_view(), name='contract_delete'),
    path('contract/sign/<int:pk>', ContractSignView.as_view(), name='contract_sign'),
    path('statisctics/<int:pk>', StatisticsView.as_view(), name='stat'),
    re_path(r'^statisctics/company/(?P<pk>\d+)$', CompanyStatisticsView.as_view(), name='company_statisctics'),
    path('statisctics/chart/<int:pk>', CompanyPolicyChartDetailView.as_view(), name='chart_statisctics'),
    path('contract/update/<int:pk>', UpdateClientContractView.as_view(), name='contract_udpate'),
    path('news/<int:pk>', NewsDeailView.as_view(), name='news_detail'),
    path('affiliate/<int:pk>', AffiliateEmployeeView.as_view(), name='affiliate_employee'),
    path('affiliate/company', CompanyDetailView.as_view(), name='company_info'),
    path('affiliates/privacy', PrivacyPolicyDetailView.as_view(), name='privacy'),
    path('affiliates/sandobx', SandboxView.as_view(), name='sandbox'),
    path('affiliates/contacts', ContactListView.as_view(), name='contacts'),

    path('add_contact/', add_contact, name='add_contact'),
    path('scroll', ScrollPageView.as_view(), name='scroll')
] 