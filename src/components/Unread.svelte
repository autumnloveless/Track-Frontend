<script>
  import Fa from 'svelte-fa'
  import { faEnvelopeOpen,faEnvelope } from '@fortawesome/free-regular-svg-icons'

  export let read;
</script>

{#if read}
    <Fa icon={faEnvelopeOpen}/>
{:else}
    <Fa icon={faEnvelope}/>
{/if}