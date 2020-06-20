<template>
    <v-form v-model="valid"
            ref="form" >
        <v-container>
            <v-text-field
                    v-model="email"
                    label="Ваш e-mail"
                    :rules="emailRules"
                    @keydown.enter="loginClick()"
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    label="Пароль"
                    :rules="passwordRules"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @keydown.enter="loginClick()"
                    @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn color="primary" dark
                   @click="loginClick()"
            >Поехали!</v-btn>
        </v-container>
    </v-form>
</template>

<script>
    import {AUTH_REQUEST/*, AUTH_SUCCESS, AUTH_ERROR*/} from "../store/mutation-types";

    export default {
        name: "LoginForm",
        data: () => ({
            valid: false,
            // TODO change to ''
            email: 'kulibin@gpb.ru',
            // правила проверки логина
            emailRules: [
                text => !!text || 'E-mail обязателен'
                // TODO e-mail формат
                //v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            password: '',
            // правила проверки пароля
            passwordRules: [
                text => !!text || 'Пароль обязателен'
            ],
            // отображать пароль
            showPassword: false
        }),
        methods: {
            loginClick() {
                // validation form
                if (!this.$refs.form.validate()) {
                    console.log('login fail');
                    return
                }
                const { email, password } = this
                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                    console.log('login OK');
                    // переход на главную страницу
                    this.$router.push('/proposals')
                })
            }
        }
    }
</script>

<style scoped>

</style>
