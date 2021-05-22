$(document).ready(function() {
    $('#accountCreateForm').validate({
        rules: {
            personFirstName: {
                required: true,
                minlength: 3
            },
            personLastName: {
                required: true,
                minlength: 3
            },
            personAge: {
                required: true,
                number: true,
                min: 18
            },
            personEmail: {
                required: true,
                email: true
            },
            personPassword: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            personFirstName: {
                required: 'Поле "Имя Пользователя" должно быть заполнено.',
                minlength: 'Имя пользователя должно состоять минимум из 3 символов.'
            },
            personLastName: {
                required: 'Поле "Фамилия Пользователя" должно быть заполнено.',
                minlength: 'Фамилия пользователя должна состоять минимум из 3 символов.'
            },
            personAge: {
                required: 'Введите пожалуйста свой возраст.',
                number: 'В поле возраст должен быть введен ваш текущий возраст.',
                min: 'Вам должно быть не меньше 18 лет.'
            },
            personEmail: {
                required: 'В поле email должен быть введен ваш текущий действующий email.',
                email: 'Ваш email адрес должен быть задан в следующем формате: abc@domain.ext.'
            },
            personPassword: {
                required: 'Поле пароль должно быть заполнено.',
                minlength: 'У минимальной длины пароля должно быть 6 символов.'
            }
        }
    });
});