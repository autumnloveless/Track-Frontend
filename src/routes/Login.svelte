<script>
  import {fade} from 'svelte/transition'
  import {onMount} from 'svelte'
  import {checkAuth} from '../services/authService.js';
  import Fa from 'svelte-fa'
  import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
  import { login as loginAPI } from '../services/authService.js'
  import {push,replace} from 'svelte-spa-router'
  let email= "",password = "";
  let rememberMe = true, loading = false;

  onMount(async () => {
    let { user } = await checkAuth();
    if(user && user.id){ replace('/app') }
  })

  const login = async (e) => {
    loading = true;
    let result = await loginAPI({ 
        email: email,
        password: password,
        remember_me: rememberMe
    })
    loading = false;
    if (result.success) { push('/app') }
  }
</script>

<section class="hero is-primary is-fullheight" in:fade="{{duration: 500}}">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop">
          <form action="" class="box">
            <div class="field">
              <label for="email" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" bind:value={email} required>
                <span class="icon is-small is-left">
                  <Fa icon={faEnvelope}/>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="password" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" bind:value={password} required>
                <span class="icon is-small is-left">
                  <Fa icon={faLock}/>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="rememberme" class="checkbox">
                <input name="rememberme" id="rememberme" type="checkbox" bind:checked={rememberMe}>
                Remember me
              </label>
            </div>
            <div class="field is-flex is-align-items-center is-justify-content-space-between">
              <button type="button" on:click={login} class="button is-success" class:is-loading="{loading}">
                Login
              </button>
              <a href="/#/forgot_password" class="ml-3" style="color: #555" class:is-loading="{loading}">
                Forgot Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
