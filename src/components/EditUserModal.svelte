<script>
    import { faLock, faEnvelope, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
    export let active = false;
    let strength = 0;
    let loading = false;
    let validations = [];
    let password="",firstName="",lastName="",email = "";

    const validatePassword = (e) => {
        validations = [
            (password.length > 11),
            (password.search(/[A-Z]/) > -1),
            (password.search(/[0-9]/) > -1),
            (password.search(/[$&+%!,:;=?@#]/) > -1)
        ]

        strength = validations.reduce((acc,cur) => acc + cur);
    }

    const updateUserInfo = async (e) => {
        loading = true;
        // let result = await register({ 
        //     email: email,
        //     password: password, 
        //     firstName: firstName, 
        //     lastName: lastName 
        // })
        loading = false;
        // if (result.success) { push('/app') }
        // if (result.error) { error = result.error }
        active = false;
    }
</script>

<div class="modal" class:is-active="{active}">
    <div class="modal-background" on:click={() => active = false}></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit User</p>
        <button class="delete" aria-label="close" on:click={() => active = false}></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
            <label for="firstName" class="label">First Name</label>
            <div class="control has-icons-left">
              <input type="text" placeholder="Robert" bind:value={firstName} class="input" required>
              <span class="icon is-small is-left">
                <Fa icon={faEnvelope}/>
              </span>
            </div>
          </div>
          <div class="field">
            <label for="lastName" class="label">Last Name</label>
            <div class="control has-icons-left">
              <input type="text" placeholder="Smith" bind:value={lastName} class="input" required>
              <span class="icon is-small is-left">
                <Fa icon={faEnvelope}/>
              </span>
            </div>
          </div>
          <div class="field">
            <label for="email" class="label">Email</label>
            <div class="control has-icons-left">
              <input type="email" placeholder="bobsmith@gmail.com" bind:value={email} class="input" required>
              <span class="icon is-small is-left">
                <Fa icon={faEnvelope}/>
              </span>
            </div>
          </div>
          <div class="field">
            <label for="password" class="label">Password</label>
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" on:click={updateUserInfo}>Save changes</button>
        <button class="button" class:is-loading="{loading}" on:click={() => active = false}>Cancel</button>
      </footer>
    </div>
</div>