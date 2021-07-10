<script>
  import Fa from 'svelte-fa'
  import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
  import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'

  export let starred;
</script>

{#if starred}
    <Fa icon={solidStar}/>
{:else}
    <Fa icon={regularStar}/>
{/if}