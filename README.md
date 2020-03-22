# Qui prend quoi

## Local dev

`npm install`

`npm run dev`

## Améliorations apportées

- Affichage de la liste des items sur la page événément (`app.js`, `party.pug`)
- Possibilité de supprimer un item (`api/common.js`, `blocs/item.pug`)
- Utlisation de WebSocket (`scripts/socket.js`, `api/socket.js`, `partials/item_form.pug`)
- Meilleure présentation visuelle des items (`blocs/items.scss`)

## Article personnel

### Sujet : WebSocket

La mise en place de l'**API WebSocket** pour cette application permet à plusieurs utilisateurs connectés en même temps de **récupérer dynamiquement** les items ajouter pas les autres. 

Bien que cette API soit supportées par la majorité des navigateurs, nous l'avons ici intégrer avec la philsophie d'**amélioration progressive**. 

L'attribut `onsubmit` sur le formulaire d'ajout de ressource permet d'excécuter un script en amont de l'envoie. Si ce script retourne `true` le formulaire sera envoyé, s'il retourne `false` il ne sera pas envoyé. 

```html
  <form onsubmit="return webSocket(id)"></form>
```

```javascript
form.webSocket = () => {
  if ( 'WebSocket' in window) {
    // USE SOCKET TO SEND DATA
    return false
  } else {
    // CLASSIC FORM USAGE
    return true
  }
}
```

Pour une utilisation simplifiée des WebSockets nous avons ici utilisé la librairie Socket.io (en front et en back)

Le server back est disponible sur 2 ports:
  - Le port **3000** sert l'application front et gère les appels REST vers la base dé donnée
  - Le port **3001** met à disposition une socket


