<script>
    import { faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
    import api from '../services/apiService.js'
    import { toast } from '@zerodevx/svelte-toast'
    import Fa from 'svelte-fa'
    export let active = false;
    let strength = 0;
    let loading = false, matches;
    let validations = [];
    let newPassword="",oldPassword="",repeatPassword="";

    const validatePassword = (e) => {
        validations = [
            (password.length > 11),
            (password.search(/[A-Z]/) > -1),
            (password.search(/[0-9]/) > -1),
            (password.search(/[$&+%!,:;=?@#]/) > -1)
        ]

        strength = validations.reduce((acc,cur) => acc + cur);
    }

    const matchPassword = () => {
      matches = newPassword == repeatPassword
    }

    const updateUserInfo = async (e) => {
      loading = true;
      let result = await api.updateUser({ 
          email: email,
          firstName: firstName, 
          lastName: lastName 
      });
      loading = false;
      if (result.success) { toast.push("User updated")  }
      if (result.error) { toast.push('Error updating user', { theme: {
      '--toastBackground': '#F56565',
      '--toastProgressBackground': '#C53030'
      }}); }
      active = false;
    }
</script>

<div class="modal" class:is-active="{active}">
    <div class="modal-background" on:click={() => active = false}></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Change Password</p>
        <button class="delete" aria-label="close" on:click={() => active = false}></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="password" class="label">Old Password</label>
          <div class="control has-icons-left">
            <input type="password" placeholder="*******" class:invalid="{strength == 0}" class="input" bind:value={oldPassword} required on:input={validatePassword}>
            <span class="icon is-small is-left"><Fa icon={faLock}/></span>
          </div>
        </div>
        <div class="field">
          <label for="password" class="label">New Password</label>
          <div class="control has-icons-left">
            <input type="password" placeholder="*******" class:invalid="{strength == 0}" class="input" bind:value={newPassword} required on:input={validatePassword}>
            <span class="icon is-small is-left"><Fa icon={faLock}/></span>
              {#if newPassword && newPassword.length > 0 }
                  <ul class="pl-1">
                      <li> {#if validations[0]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must be at least 12 characters</li>
                      <li> {#if validations[1]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain a capital letter</li>
                      <li> {#if validations[2]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain a number</li>
                      <li> {#if validations[3]} <Fa icon={faCheck} color="green"/> {:else}<Fa icon={faTimes} color="red"/> {/if} must contain one of $&+%!,:;=?@#</li>
                  </ul>
              {/if}
          </div>
        </div>
        <div class="field">
          <label for="password" class="label">Repeat New Password</label>
          <div class="control has-icons-left">
            <input type="password" placeholder="*******" class:invalid="{repeatPassword && !matches}" class="input" bind:value={repeatPassword} required on:input={matchPassword}>
            <span class="icon is-small is-left"><Fa icon={faLock}/></span>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" on:click={updateUserInfo}>Change Password</button>
        <button class="button" class:is-loading="{loading}" on:click={() => active = false}>Cancel</button>
      </footer>
    </div>
</div>