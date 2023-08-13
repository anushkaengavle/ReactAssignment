import React from 'react';
import Card from './Card';

function KanbanBoard({ tickets, groupOption, orderOption }) {
  let groupedTickets = [...tickets];

  // Grouping logic based on selected option
  if (groupOption === 'status') {
    // Group by status
    groupedTickets = tickets.reduce((groups, ticket) => {
      const status = ticket.status;
      if (!groups[status]) groups[status] = [];
      groups[status].push(ticket);
      return groups;
    }, {});
  } else if (groupOption === 'user') {
    // Group by user
    groupedTickets = tickets.reduce((groups, ticket) => {
      const user = ticket.userId;
      if (!groups[user]) groups[user] = [];
      groups[user].push(ticket);
      return groups;
    }, {});
  }
  else if (groupOption === 'prioritygrouping') {
    // Group by priority
    groupedTickets = tickets.reduce((groups, ticket) => {
      const pri = ticket.priority;
      if (!groups[pri]) groups[pri] = [];
      groups[pri].push(ticket);
      return groups;
    }, {});
  }

  // Apply ordering logic based on selected option
  const orderedGroupedTickets = Object.keys(groupedTickets).reduce((sorted, key) => {
    console.log(typeof(groupedTickets)) ;
    sorted[key] = groupedTickets[key].sort((a, b) => {
      if (orderOption === 'priority') {
        return b.priority - a.priority; // Order by priority (descending)
      } else if (orderOption === 'title') {
        return a.title.localeCompare(b.title); // Order by title (alphabetical)
      }
      return 0;
    });
    return sorted;
  }, {});

  return (
    <div className="KanbanBoard d-flex">
      {Object.keys(orderedGroupedTickets).map((group) => (
        <div key={group} className="group">
          <h2>{getgroupname(group)}</h2>      
          <div className="card-container">
            {orderedGroupedTickets[group].map((ticket) => (
              <Card
                key={ticket.id}
                title={ticket.title}
                id={ticket.id}
                tag={ticket.tag}
                priority={ticket.priority}
                userId={ticket.userId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
function getgroupname(group){
  if (group == 0)
  return "No priority";
  else if(group == 1)
  return "Low";
  else if(group==2 )
  return "Meduim";
  else if(group==3 )
  return "High";
  else if(group==4)
  return"Urgent";
else
return group;
}
export default KanbanBoard;
