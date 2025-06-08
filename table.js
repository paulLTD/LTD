```javascript
/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.cards('all').then(function(cards) {
    var tbody = document.getElementById('card-table-body');
    tbody.innerHTML = ''; // Clear existing content
    cards.forEach(function(card) {
      var row = document.createElement('tr');
      var cell = document.createElement('td');
      cell.textContent = card.name;
      row.appendChild(cell);
      tbody.appendChild(row);
    });
  });
});
```