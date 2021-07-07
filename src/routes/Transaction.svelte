<script>
    export let params = {}
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
        <div class="card-header capitalize"><p class="card-header-title">Transaction {params.id}</p></div>
        <div class="card-content">
          Transaction info here
        </div>
      </div>
    </div> 
  </section>