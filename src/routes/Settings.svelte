<script>
  import {fade} from 'svelte/transition'
  import api from '../services/apiService.js';
  import Accounts from '../components/Accounts.svelte'
  import { toast } from '@zerodevx/svelte-toast'
  import { push, pop,replace } from 'svelte-spa-router'
  import {onMount} from 'svelte'
  import {checkAuth} from '../services/authService.js';

  onMount(async () => {
    let { user } = await checkAuth();
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
  let accountPromise = api.getAccounts();
</script>


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
      <div class="card-header capitalize"><p class="card-header-title">Settings</p></div>
      <div class="card-content">
        <div class="is-flex is-flex-direction-column is-align-items-center">
          <button class="button is-info m-2" on:click={api.linkBankAccount}>Add Bank Account</button>
          <button class="button is-info m-2" on:click={updateTransactions}>Refresh Transactions</button>
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