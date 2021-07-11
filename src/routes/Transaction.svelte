<script>
  export let params = {}
  import Unread from '../components/Unread.svelte';
  import Starred from '../components/Starred.svelte';
  import {checkAuth} from '../services/authService.js';
  import api from '../services/apiService.js';
  import { onMount } from 'svelte';
  import { push, pop } from 'svelte-spa-router'
  let loading = true;
  let transaction = {};
  
  onMount(async () => {
    let { user } = await checkAuth();
    if(!user || !user.id){
      push('/login')
    } else {
      transaction = await api.getTransaction(params.id);
      loading = false;
    }
  })

  const toggleStar = async () => {
    let result = await api.updateTransaction(transaction.id, { starred: !transaction.starred });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const markUnread = async () => {
    let result = await api.updateTransaction(transaction.id, { read: false });
    if (result && !result.error) { pop() }
    else { console.log(result.error) }
  }
</script>

{#if loading}
  <div class="loading-container section is-medium">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
{:else if transaction.id != null}
  <section class="main-content-container">
    <aside class="sidebar mt-5 ml-2 is-hidden-mobile scroll">
      <div>
        <p class="menu-label is-hidden-mobile">Return to Inbox</p>
        <ul class="menu-list">
            <li><button on:click={pop} type="button" class="button">Back</button></li>
        </ul>
      </div>
    </aside>

    <div class="main-content scroll">
      <div class="card">
        <div class="card-header capitalize">
          <p class="card-header-title">{transaction.merchantName || transaction.name}</p>
          <p class="card-header-icon" on:click={markUnread}><Unread read={transaction.read} /></p>
          <p class="card-header-icon" on:click={toggleStar}><Starred starred={transaction.starred} /></p>
        </div>
        <div class="card-content">
          <p>${transaction.amount.toFixed(2)}</p>
          <p>{transaction.merchantName || transaction.name}</p>
          <p>{new Date(transaction.date).toLocaleString()}</p>
          <p>Pending: {transaction.pending}</p>
          <p>Category: {transaction.category}</p>
          <p>Payment Channel: {transaction.paymentChannel}</p>
          <p>Type: {transaction.transactionType}</p>
          <p>Location: {transaction.locationId}</p>
        </div>
      </div>
    </div> 
  </section>
{:else}
  <div>An error occurred while fetching the transaction. If this error occurs again, contact us!</div>
{/if}