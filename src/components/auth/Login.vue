<template>
    <v-container fill-height fluid class="background-2">
        <v-row
            align="center"
            justify="center"
        >
            <v-col style="max-width:700px">
                <v-card class="pa-5">
                    
                    <v-card-title>
                        <h3 class="mr-3"><strong>TODOs</strong></h3>
                        Sign in
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
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
                                <v-col cols="10">
                                    <v-text-field
                                        label="Password"
                                        :type="passVis ? 'text' : 'password'"
                                        v-model.trim="password"
                                        autocomplete="password"
                                        persistent-hint
                                        dense
                                        outlined
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn text icon color="grey" @click="passVis = ! passVis">
                                        <v-icon>{{ !passVis ? 'visibility' : 'visibility_off' }}</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="secondary" text to="/signup">Sign up</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary"
                            class="font-weight-bold"
                            @click="submit"
                            :loading="loading"
                            :disabled="!valid"
                        >Sign in</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Incorrect email format',
            ],
            password:'',
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
                    }
                    await this.$store.dispatch('loginUser', user)
                    this.$router.push('/')
                }
            
            } catch(error) {
                console.log(error.message);
            }
            finally {
                this.loading = false
            }
        },
    }
}
</script>