function Person(surname, name, patronymic, gender, age) {
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.gender = gender;
    this.age = age;
}

Person.prototype.getFullName = function() {
    return `${this.surname} ${this.name} ${this.patronymic}`;
};

function Student(surname, name, patronymic, gender, age, course) {
    Person.call(this, surname, name, patronymic, gender, age);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.getCourse = function() {
    return this.course;
};

const students = [];

function addStudent() {
    const surname = document.getElementById('surname').value;
    const name = document.getElementById('name').value;
    const patronymic = document.getElementById('patronymic').value;
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const course = parseInt(document.getElementById('course').value);

    if (surname.length > 12 || name.length > 12 || patronymic.length > 12) {
        alert('Фамилия, имя и отчество должны быть не более 12 букв.');
        return;
    }
    if (gender !== 'М' && gender !== 'Ж') {
        alert('Пол должен быть указан буквами М или Ж.');
        return;
    }
    if (age < 16 || age > 35) {
        alert('Возраст должен быть целым числом от 16 до 35.');
        return;
    }
    if (course < 1 || course > 5) {
        alert('Курс должен быть целым числом от 1 до 5.');
        return;
    }

    const student = new Student(surname, name, patronymic, gender, age, course);
    students.push(student);
    displayStudents();
}

function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(student => {
        const div = document.createElement('div');
        div.className = 'student-card';
        div.innerHTML = `
            <h3>${student.getFullName()}</h3>
            <p>Пол: ${student.gender}</p>
            <p>Возраст: ${student.age}</p>
            <p>Курс: ${student.getCourse()}</p>
        `;
        studentList.appendChild(div);
    });
}

function calculateResult() {
    const courseCount = {};
    const maleCount = {};
    students.forEach(student => {
        if (!courseCount[student.course]) {
            courseCount[student.course] = 0;
            maleCount[student.course] = 0;
        }
        courseCount[student.course]++;
        if (student.gender === 'М') {
            maleCount[student.course]++;
        }
    });

    let maxPercentage = 0;
    let maxCourse = 0;

    for (const course in courseCount) {
        const percentage = (maleCount[course] / courseCount[course]) * 100;
        if (percentage > maxPercentage) {
            maxPercentage = percentage;
            maxCourse = course;
        }
    }

    const result = document.getElementById('result');
    result.textContent = `Наибольший процент мужчин на курсе: ${maxCourse} (${maxPercentage.toFixed(2)}%)`;
}