<script>
  import Fa from 'svelte-fa'
  import { faEnvelopeOpen,faEnvelope } from '@fortawesome/free-regular-svg-icons'

  export let read;
</script>

{#if read}
    <div title="mark as read"><Fa icon={faEnvelopeOpen}/></div>
{:else}
    <div title="mark as unread"><Fa icon={faEnvelope}/></div>
{/if}