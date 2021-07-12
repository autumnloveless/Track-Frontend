<script>
    import { faLock, faEnvelope, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
    export let active = false, user = {};
    let strength = 0;
    let loading = false;
    let validations = [];
    let firstName="",lastName="",email = "";

    $: {  
      firstName = user?.firstName;
      lastName = user?.lastName;
      email = user?.email;
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" on:click={updateUserInfo}>Save changes</button>
        <button class="button" class:is-loading="{loading}" on:click={() => active = false}>Cancel</button>
      </footer>
    </div>
</div>