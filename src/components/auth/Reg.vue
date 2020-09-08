<template>
    <v-container fill-height fluid class="background-1">
        <v-row
            align="center"
            justify="center"
        >
            <v-col style="max-width:1000px">
                <v-card class="pa-5">
                    
                    <v-card-title>
                        <h3 class="mr-3"><strong>TODOs</strong></h3>
                        Sign up
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col cols="12" md="6">
                                <v-text-field
                                    label="Your name"
                                    type="text"
                                    v-model.trim="name"
                                    :rules="nameRules"
                                    dense
                                    outlined
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-text-field
                                label="Email address"
                                type="email"
                                autocomplete="email"
                                v-model.trim="email"
                                :rules="emailRules"
                                dense
                                outlined
                            >
                            </v-text-field>

                            <v-row>
                                <v-col cols="12" sm="12" md="5">
                                    <v-text-field
                                        label="Password"
                                        :type="passVis ? 'text' : 'password'"
                                        v-model.trim="password"
                                        :rules="passwordRules"
                                        hint="At least 8 characters, letters, numbers and special characters"
                                        autocomplete="new-password"
                                        persistent-hint
                                        dense
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col sm="10" md="5">
                                    <v-text-field
                                        label="Confirm password"
                                        :type="passVis ? 'text' : 'password'"
                                        v-model.trim="confirmPassword"
                                        :rules="confirmPasswordRules"
                                        autocomplete="new-password"
                                        dense
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn text icon color="grey" @click="passVis = ! passVis">
                                        <v-icon>{{ !passVis ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="secondary" text to="/signin">Sign in</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary"
                            class="font-weight-bold"
                            @click="submit"
                            :loading="loading"
                            :disabled="!valid"
                        >Sign up</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
export default {
    created () {
        if(this.isUserLoggedIn) {
            this.$router.push('/')
            return
        }
    },
    computed: {
        isUserLoggedIn() {
            return !!this.$store.state.user
        }
    },
    data () {
        return {
            passVis: false,
            valid: false,
            loading: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Incorrect email format',
            ],

            password:'',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 8) || 'Min length of password is 8 symbols'
            ],
            confirmPassword: '',
            confirmPasswordRules: [
                v => !!v || 'Confirm password',
                v => v === this.password || 'Passwords are not equal'
            ],
        }
    },
    methods: {
        async submit() {
            try {
                this.loading = true
                if(this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password,
                        name: this.name,
                    }
                    await this.$store.dispatch('registerUser', user)
                    this.$router.push('/')
                } 
            } finally {
                this.loading = false
            }
        },
    }
}
</script>