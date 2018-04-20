<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="btn-toolbar my-3" role="toolbar" aria-label="Toolbar with button groups">
                    <button type="button" class="btn btn-light btn-sm">American</button>
                    <button type="button" class="btn btn-light btn-sm">Romana</button>
                    <button type="button" class="btn btn-light btn-sm">Neapolitan</button>
                    <button type="button" class="btn btn-light btn-sm">Delivery</button>
                    <button type="button" class="btn btn-light btn-sm">Value</button>
                    <button type="button" class="btn btn-light btn-sm">Fancy</button>
                    <button type="button" class="btn btn-light btn-sm">Bar</button>

                </div>


                <table class="table table-striped main-list">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">🍕</th>
                        <th scope="col">Shanghai Pizza Rankings</th>
                        <th scope="col"><button class="btn btn-secondary btn-sm dropdown-toggle my-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fal fa-star"></i>

                        </button>
                            <div class="dropdown-menu">
                                ...
                            </div></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td><a href="venue.html"> Bella Napoli</a><span class="badge badge-pill badge-secondary">Neapolitan</span>
                        </td>
                        <td>4.6</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Calypso Restaurant & Lounge<span class="badge badge-pill badge-secondary">Neapolitan</span></td>
                        <td>4.4</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Palatino Roman Cuisine<span class="badge badge-pill badge-secondary">Romana</span></td>
                        <td>4.4</td>
                    </tr>

                    <tr>
                        <th scope="row">4</th>
                        <td>Pizza Express<span class="badge badge-pill badge-secondary">American</span>
                            <span class="badge badge-pill badge-secondary">Delivery</span>
                            <span class="badge badge-pill badge-secondary">Romana</span>
                            <span class="badge badge-pill badge-secondary">Neapolitan</span>
                        </td>
                        <td>4.3</td>
                    </tr>

                    <tr>
                        <th scope="row">5</th>
                        <td>The Kitchen Salvatore Cuomo<span class="badge badge-pill badge-secondary">Neapolitan</span></td>
                        <td>4.0</td>
                    </tr>

                    <tr>
                        <th scope="row">6</th>
                        <td>Palatino Roman Cuisine<span class="badge badge-pill badge-secondary">Romana</span></td>
                        <td>3.8</td>
                    </tr>

                    <tr>
                        <th scope="row">7</th>
                        <td>Mercato<span class="badge badge-pill badge-secondary">Famcy</span></td>
                        <td>3.8</td>
                    </tr>

                    <tr>
                        <th scope="row">8</th>
                        <td>Palatino Roman Cuisine<span class="badge badge-pill badge-secondary">Bar</span></td>
                        <td>3.7</td>
                    </tr>

                    <tr>
                        <th scope="row">9</th>
                        <td>D.O.C Gastronomia Italiana<span class="badge badge-pill badge-secondary">Neapolitan</span></td>
                        <td>3.7</td>
                    </tr>
                    <tr>
                        <th scope="row">10</th>
                        <td>Shanghai DaMarco Italian Restaurant<span class="badge badge-pill badge-secondary">Romana</span></td>
                        <td>3.7</td>
                    </tr>

                    <tr>
                        <th scope="row">11</th>
                        <td>Pizza Vera Bund<span class="badge badge-pill badge-secondary">Fancy</span></td>
                        <td>3.6</td>
                    </tr>

                    <tr>
                        <th scope="row">12</th>
                        <td>Bottega<span class="badge badge-pill badge-secondary">Delivery</span></td>
                        <td>3.6</td>
                    </tr>

                    <tr>
                        <th scope="row">13</th>
                        <td>Scarpetta Trattoria<span class="badge badge-pill badge-secondary">Bar</span></td>
                        <td>3.8</td>
                    </tr>

                    <tr>
                        <th scope="row">14</th>
                        <td>Homeslice<span class="badge badge-pill badge-secondary">American</span></td>
                        <td>3.7</td>
                    </tr>

                    <tr>
                        <th scope="row">15</th>
                        <td>Joe's Pizza<span class="badge badge-pill badge-secondary">American</span><span class="badge badge-pill badge-secondary">Delivery</span></td>
                        <td>3.7</td>
                    </tr>
                    <tr>
                        <th scope="row">16</th>
                        <td>Seve Italian Restaurant</td>
                        <td>3.7</td>
                    </tr>

                    <tr>
                        <th scope="row">17</th>
                        <td>Uva</td>
                        <td>3.6</td>
                    </tr>

                    <tr>
                        <th scope="row">18</th>
                        <td>Bottega</td>
                        <td>3.6</td>
                    </tr>

                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        quote: ''
      }
    },
    methods: {
      getQuote() {
        this.$http
          .get('http://localhost:3001/api/random-quote', (data) => {
            this.quote = data;
          })
          .error((err) => console.log(err))
      }
    }
  }
</script>