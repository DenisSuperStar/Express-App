$(document).ready(function() {
    $('#accountExistForm').validate({
        rules: {
            authEmail: {
                required: true,
                email: true
            },
            authPassword: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            authEmail: {
                required: 'Авторизуйтесь по вашему email адресу.',
                email: 'Ваш email адрес должен быть задан в формате: abc@domain.ext.'
            },
            authPassword: {
                required: 'Поле пароль должно быть заполнено.',
                minlength: 'Минимальная длина пароля должна составлять 6 символов.'
            }
        }
    });
});