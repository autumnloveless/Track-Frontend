<script>
  import Fa from 'svelte-fa'
  import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
  export let open;
</script>

{#if open}
  <p class="card-header-icon"><Fa icon={faAngleUp}/></p>
{:else}
  <p class="card-header-icon"><Fa icon={faAngleDown}/></p>
{/if}