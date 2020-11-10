export interface <%= classify(name)%> {
<% for(let val in inputs){ %>
    <%=inputs[val].name%> : <%=inputs[val].type%>; <%}%>
}