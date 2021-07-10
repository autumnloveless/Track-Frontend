<script>
    export let params = {}
    import { onDestroy } from 'svelte';
    import { push, pop } from 'svelte-spa-router'
    import { user } from '../store.js'
    let unsubscribe = user.subscribe((u) => { if(!u.id){ push('/login') } })
    onDestroy(unsubscribe);
</script>


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
        <div class="card-header capitalize"><p class="card-header-title">Transaction {params.id}</p></div>
        <div class="card-content">
          Transaction info here
        </div>
      </div>
    </div> 
  </section>