<script>
    import api from '../services/apiService.js';
    import { onDestroy } from 'svelte';
    import { push, pop } from 'svelte-spa-router'
    import { user } from '../store.js'
    let unsubscribe = user.subscribe((u) => { if(!u.id){ push('/login') } })
    onDestroy(unsubscribe);
</script>


<section class="main-content columns is-fullheight">
    <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">Return to Inbox</p>
        <ul class="menu-list">
            <li><button on:click={pop} type="button" class="button">Back</button></li>
        </ul>
    </aside>

    <div class="column is-9 section">
      <div class="card">
        <div class="card-header capitalize"><p class="card-header-title">Settings</p></div>
        <div class="card-content">
            <button class="button is-info m-2" on:click={api.linkBankAccount}>Add Bank Account</button>
            <button class="button is-info m-2" on:click={api.updateTransactions}>Refresh Transactions</button>
        </div>
      </div>
    </div> 
  </section>