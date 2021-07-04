<script>
    import Fa from 'svelte-fa'
    import { faLock, faEnvelope, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
</script>

<section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop">
            <form action="" class="box">
              <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required>
                  <span class="icon is-small is-left">
                    <Fa icon={faEnvelope}/>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="password" class="label">Password</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" required>
                  <span class="icon is-small is-left">
                    <Fa icon={faLock}/>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox">
                 Remember me
                </label>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
