<script>
  export let params = {}
  import { faAngleLeft, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import Unread from '../components/Unread.svelte';
  import Starred from '../components/Starred.svelte';
  import {checkAuth} from '../services/authService.js';
  import api from '../services/apiService.js';
  import { onMount } from 'svelte';
  import { push, pop } from 'svelte-spa-router'
  let loading = true;
  let transaction = {};
  let edit = false;
  let editElement;
  let userTags = [];

  $: userTags = transaction?.tags?.length > 0 ? transaction.tags.split(",") : [];

  const editTags = () => {
    edit = true;
    setTimeout(() => editElement.focus(), 50);
  }

  const saveTags = async () => {
    edit = false;
    let result = await api.updateTransaction(transaction.id, { tags: transaction.tags });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const keydown = (event) => {
    if(event.key == "Enter"){
      edit = false;
    }
  }

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
    <div class="main-content scroll">
      <div class="card">
        <div class="card-header capitalize">
          <p class="card-header-icon light-grey-bg" on:click={pop}><Fa icon={faAngleLeft}/></p>
          <p class="card-header-title">{transaction.merchantName || transaction.name} - ${transaction.amount.toFixed(2)}</p>
          <p class="card-header-icon" on:click={markUnread}><Unread read={transaction.read} /></p>
          <p class="card-header-icon" on:click={toggleStar}><Starred starred={transaction.starred} /></p>
        </div>
        <div class="card-content">
          <p><b>Amount</b>: ${transaction.amount.toFixed(2)}</p>
          {#if transaction.merchantName}<p><b>Merchant</b>: {transaction.merchantName}</p>{/if}
          <p><b>Name</b>: {transaction.name}</p>
          <p><b>Date</b>: {new Date(transaction.date).toLocaleString("en", { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric' })}</p>
          <p><b>Authorized Date</b>: {new Date(transaction.authorizedDate).toLocaleString("en", { year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric' })}</p>
          <p><b>Pending</b>: {transaction.pending}</p>
          <p><b>Category</b>: {transaction.category}</p>
          <p><b>Payment Channel</b>: {transaction.paymentChannel}</p>
          <p><b>Type</b>: {transaction.transactionType}</p>
          <p><b>Account</b>: {transaction.PlaidAccount?.name}</p>
          <p><b>Location</b>: {transaction.locationId}</p>
        </div>
        <div class="card-footer is-align-items-center" style="padding: 10px">
          <span class="pr-3 pl-3">Tags: </span>  
          <div class="is-flex is-flex-grow-1" class:is-hidden={edit} on:click={editTags}>
            <div class="is-flex-grow-1">
              {#each userTags as tag}
                <span class="pending-icon mx-1">{tag}</span>
              {/each}
            </div>
            <span class="is-flex-grow-0">
              <Fa icon={faEdit}/>
            </span>
          </div>
          <p class="control has-icons-right w-100" class:is-hidden={!edit}>
            <input bind:this={editElement} class="input" type="text" bind:value={transaction.tags} on:blur={saveTags} on:keydown={keydown}>
            <span class="icon is-small is-right">
              <Fa icon={faCheck}/>
            </span>
          </p>
        </div>
      </div>
    </div> 
  </section>
{:else}
  <div>An error occurred while fetching the transaction. If this error occurs again, contact us!</div>
{/if}

<style>
  .pending-icon {
    font-size: 12px;
    font-weight: 500;
    background: #5282bd;
    color: #fff;
    padding: 1px 3px;
    border-radius: 2px;
    display: inline-flex;
  }
</style>