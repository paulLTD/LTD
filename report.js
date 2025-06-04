var Promise = window.TrelloPowerUp.Promise;

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options) {
    return [{
      text: 'Generate Report',
      callback: function(t) {
        return t.popup({
          title: 'Table Report',
          url: './report.html',
          height: 600
        });
      }
    }];
  },
  'show-settings': function(t, options) {
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});

// Report generation logic
document.addEventListener('DOMContentLoaded', function() {
  var t = window.TrelloPowerUp.iframe();

  t.render(function() {
    return Promise.all([
      t.cards('id', 'name', 'dateLastActivity', 'due', 'idMembers'),
      t.get('board', 'shared', 'customFields'),
      t.members('id', 'fullName'),
      t.board('actions')
    ]).then(function(data) {
      var cards = data[0];
      var customFields = data[1] || [];
      var members = data[2];
      var actions = data[3];

      // Create a map of member IDs to names
      var memberMap = {};
      members.forEach(function(member) {
        memberMap[member.id] = member.fullName;
      });

      // Fetch custom field values for each card
      return Promise.all(cards.map(function(card) {
        return t.get('card', 'shared', 'customFieldItems', card.id).then(function(customFieldItems) {
          card.customFieldItems = customFieldItems || [];
          return card;
        });
      })).then(function(cardsWithCustomFields) {
        // Generate table HTML
        var tableHtml = '<style>' +
          'table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }' +
          'th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }' +
          'th { background-color: #f2f2f2; }' +
          'tr:nth-child(even) { background-color: #f9f9f9; }' +
          '</style>' +
          '<table>' +
          '<tr>' +
          '<th>Card Name</th>' +
          '<th>Recent Activities (Last 5)</th>' +
          '<th>Created / Due</th>' +
          '<th>Custom Fields</th>' +
          '<th>Team Members</th>' +
          '</tr>';

        cardsWithCustomFields.forEach(function(card) {
          // Get recent activities for this card
          var cardActions = actions
            .filter(function(action) {
              return action.data.card && action.data.card.id === card.id;
            })
            .sort(function(a, b) {
              return new Date(b.date) - new Date(a.date);
            })
            .slice(0, 5)
            .map(function(action) {
              return action.type + ' by ' + (action.memberCreator ? action.memberCreator.username : 'Unknown') + ' on ' + new Date(action.date).toLocaleString();
            })
            .join('<br>');

          // Get custom field values
          var customFieldValues = card.customFieldItems.map(function(item) {
            var field = customFields.find(function(f) { return f.id === item.idCustomField; });
            if (!field) return '';
            var value = item.value ? item.value.text || item.value.number || item.value.date || item.value.checked || '' : '';
            return field.name + ': ' + value;
          }).join('<br>');

          // Get team members
          var teamMembers = card.idMembers.map(function(id) {
            return memberMap[id] || 'Unknown';
          }).join(', ');

          // Format dates
          var createdDate = new Date(card.dateLastActivity).toLocaleString();
          var dueDate = card.due ? new Date(card.due).toLocaleString() : 'N/A';

          tableHtml += '<tr>' +
            '<td>' + card.name + '</td>' +
            '<td>' + (cardActions || 'No recent activity') + '</td>' +
            '<td>Created: ' + createdDate + '<br>Due: ' + dueDate + '</td>' +
            '<td>' + (customFieldValues || 'No custom fields') + '</td>' +
            '<td>' + (teamMembers || 'None') + '</td>' +
            '</tr>';
        });

        tableHtml += '</table>';

        // Render the table
        document.getElementById('report-content').innerHTML = tableHtml;
      });
    });
  });
});