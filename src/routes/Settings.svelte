<script>
  import {fade} from 'svelte/transition'
  import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import api from '../services/apiService.js';
  import Accounts from '../components/Accounts.svelte'
  import EditUserModal from '../components/EditUserModal.svelte'
  import EditPassModal from '../components/EditPasswordModal.svelte'
  import { toast } from '@zerodevx/svelte-toast'
  import { push, pop,replace } from 'svelte-spa-router'
  import {onMount} from 'svelte'
  import {checkAuth} from '../services/authService.js';
  let passModalActive = false, userModalActive = false;
  let user;
  onMount(async () => {
    ({ user } = await checkAuth());
    if(!user || !user.id){ replace('/app') }
  })

  const updateTransactions = async () => {
    let result = await api.updateTransactions();
    if (result.success){
      toast.push('Transactions refreshed succesfully');
    } else {
      toast.push('Error refreshing transactions', { theme: {
        '--toastBackground': '#F56565',
        '--toastProgressBackground': '#C53030'
      }});
    }
  }

  const deleteAccount = () => {
    toast.push('Error - Not Implemented Yet', { theme: {
        '--toastBackground': '#F56565',
        '--toastProgressBackground': '#C53030'
      }});
  }

  let accountPromise = api.getAccounts();
</script>

<EditUserModal bind:active={userModalActive} user={user} on:reload={async () => ({ user } = await checkAuth())} />
<EditPassModal bind:active={passModalActive} />

<section class="main-content-container" in:fade="{{duration: 500}}">
  <aside class="sidebar mt-5 is-hidden-mobile">
    <div>
      <p class="menu-label is-hidden-touch">Return to Inbox</p>
      <ul class="menu-list">
          <li><button on:click={pop} type="button" class="button">Back</button></li>
      </ul>
    </div>
  </aside>

  <div class="main-content scroll">
    <div class="card">
      <div class="card-header capitalize">
        <p class="card-header-icon light-grey-bg" on:click={pop}><Fa icon={faAngleLeft}/></p>
        <p class="card-header-title">Settings</p>
      </div>
      <div class="card-content">
        <div class="is-flex is-justify-content-center">
          <div>
            <b>User</b>
            <p>Name: {user?.firstName} {user?.lastName}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
        <hr>
        <div class="is-flex is-flex-direction-row is-justify-content-center is-flex-wrap-wrap">
          <div class="is-flex is-flex-direction-column is-align-items-center px-2">
            <button class="button is-success is-light m-2 w-100" on:click={api.linkBankAccount}>Add Bank Account</button>
            <button class="button is-info is-light m-2 w-100" on:click={updateTransactions}>Refresh Transactions</button>
            <button class="button is-danger is-light m-2 w-100 " on:click={deleteAccount}>Delete Account</button>
          </div>
          <div class="is-flex is-flex-direction-column is-align-items-center px-2">
            <button class="button is-info is-light m-2 w-100" on:click={() => userModalActive = true}>Update User Info</button>
            <button class="button is-info is-light m-2 w-100" on:click={() => passModalActive = true}>Change Password</button>
          </div>
        </div>
        <hr>
        <div>
          {#await accountPromise}
            <div class="loading-container section is-medium">
              <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
          {:then accounts}
            {#if accounts && accounts.length > 0}
              <Accounts accounts={accounts}/>
            {:else}
              You don't currently have any linked accounts. Set one up now.
            {/if}
          {:catch error}
            <p style="color: red">{error.message}</p>
          {/await}
        </div>
      </div>
    </div>
  </div> 
</section>


  
<style>
  .main-content-container {
    display: flex;
    padding: 10px;
    height: calc(100vh - 56px);
  }

  .main-content {
    padding: 3px;
    flex: 1;
  }
  .sidebar {
    display: flex;
    justify-content: center;
    min-width: 160px;
    flex: 0;
  }
</style>