<script>
  import api from '../services/apiService.js';
  import { push, pop } from 'svelte-spa-router'
  import {onMount} from 'svelte'
  import {checkAuth} from '../services/authService.js';

  onMount(async () => {
    let { user } = await checkAuth();
    if(!user.id){ push('/app') }
  })
</script>


<section class="main-content-container">
  <aside class="sidebar mt-5 is-hidden-mobile">
    <div>
      <p class="menu-label is-hidden-touch">Return to Inbox</p>
      <ul class="menu-list">
          <li><button on:click={pop} type="button" class="button">Back</button></li>
      </ul>
    </div>
  </aside>

  <div class="main-content">
    <div class="card">
      <div class="card-header capitalize"><p class="card-header-title">Settings</p></div>
      <div class="card-content">
        <div class="is-flex is-flex-direction-column is-align-items-center">
          <button class="button is-info m-2" on:click={api.linkBankAccount}>Add Bank Account</button>
          <button class="button is-info m-2" on:click={api.updateTransactions}>Refresh Transactions</button>
          <hr style="width: 80%"/>
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