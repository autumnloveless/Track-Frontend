<script>
  export let params = {}
  import {onMount} from 'svelte'
  import { toast } from '@zerodevx/svelte-toast'
  import {checkAuth} from '../services/authService.js';
  import { faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { resetPassword } from '../services/authService.js'
  import {push,replace} from 'svelte-spa-router'
  let password = "";
  let loading = false;
  let validations = [];
  let strength = 0;

  onMount(async () => {
    let { user } = await checkAuth();
    console.log("Checking Auth:", user)
    if(user && user.id){ replace('/app') }
  })

  const validatePassword = (e) => {
    validations = [
        (password.length > 11),
        (password.search(/[A-Z]/) > -1),
        (password.search(/[0-9]/) > -1),
        (password.search(/[$&+%!,:;=?@#]/) > -1)
    ]

    strength = validations.reduce((acc,cur) => acc + cur);
  }

  const reset = async (e) => {
    loading = true;
    let result = await resetPassword({ 
        password: password,
        tokenId: params.id 
    })
    loading = false;
    if (result.success) { push('/app') }
  }
</script>

<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop">
          <form action="" class="box">
            <div class="field">
              <label for="password" class="label">New Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class:invalid="{strength == 0}" class="input" bind:value={password} required on:input={validatePassword}>
                <span class="icon is-small is-left">
                  <Fa icon={faLock}/>
                </span>
                  {#if password && password.length > 0 }
                      <ul class="pl-1">
                          <li> {#if validations[0]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must be at least 12 characters</li>
                          <li> {#if validations[1]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain a capital letter</li>
                          <li> {#if validations[2]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain a number</li>
                          <li> {#if validations[3]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain one of $&+%!,:;=?@#</li>
                      </ul>
                  {/if}
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
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
