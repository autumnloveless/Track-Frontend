<script>
  import {onMount} from 'svelte'
  import { toast } from '@zerodevx/svelte-toast'
  import {checkAuth} from '../services/authService.js';
  import Fa from 'svelte-fa'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
  import { forgotPassword } from '../services/authService.js'
  import {push} from 'svelte-spa-router'
  let email= "";
  let loading = false;
  let success, resetSent = false;

  onMount(async () => {
    let { user } = await checkAuth();
    if(user && user.id){ push('/app') }
  })

  const reset = async (e) => {
    if(email.length < 1) { toast.push('Email is required!'); return; }
    loading = true;
    let result = await forgotPassword({ 
        email: email
    })
    loading = false;
    resetSent = true;
    success = result.success;
  }
</script>

<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop">
          <form action="" class="box">
            {#if !resetSent }
              <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" bind:value={email} required>
                  <span class="icon is-small is-left">
                    <Fa icon={faEnvelope}/>
                  </span>
                </div>
              </div>
              <div class="field is-flex is-align-items-center ">
                <button type="button" on:click={reset} class="button is-info " class:is-loading="{loading}">
                  Reset password
                </button>
                <a href="/#/forgot_password" class="ml-3" style="color: #555" class:is-loading="{loading}">
                  Login
                </a>
              </div>
            {:else if success}
              An email has been sent to {email} with further instructions.
            {:else}
              Oops! An error has occurred. Please reload and try again. If this error persists, please contact us!
            {/if}
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
