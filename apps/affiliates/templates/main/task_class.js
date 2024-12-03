class Person {
    constructor(surname, name, patronymic, gender, age) {
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.gender = gender;
        this.age = age;
    }

    getFullName() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }

    setSurname(surname) {
        if (surname.length <= 12) {
            this.surname = surname;
        } else {
            throw new Error('Фамилия должна быть не более 12 букв.');
        }
    }

    setName(name) {
        if (name.length <= 12) {
            this.name = name;
        } else {
            throw new Error('Имя должно быть не более 12 букв.');
        }
    }

    setPatronymic(patronymic) {
        if (patronymic.length <= 12) {
            this.patronymic = patronymic;
        } else {
            throw new Error('Отчество должно быть не более 12 букв.');
        }
    }

    setGender(gender) {
        if (gender === 'М' || gender === 'Ж') {
            this.gender = gender;
        } else {
            throw new Error('Пол должен быть указан буквами М или Ж.');
        }
    }

    setAge(age) {
        if (age >= 16 && age <= 35) {
            this.age = age;
        } else {
            throw new Error('Возраст должен быть целым числом от 16 до 35.');
        }
    }
}

class Student extends Person {
    constructor(surname, name, patronymic, gender, age, course) {
        super(surname, name, patronymic, gender, age);
        this.course = course;
    }

    getCourse() {
        return this.course;
    }

    setCourse(course) {
        if (course >= 1 && course <= 5) {
            this.course = course;
        } else {
            throw new Error('Курс должен быть целым числом от 1 до 5.');
        }
    }

    static addStudent() {
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
        Student.students.push(student);
        Student.displayStudents();
    }

    static displayStudents() {
        const studentList = document.getElementById('studentList');
        studentList.innerHTML = '';
        Student.students.forEach(student => {
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

    static calculateResult() {
        const courseCount = {};
        const maleCount = {};

        Student.students.forEach(student => {
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
}

Student.students = [];