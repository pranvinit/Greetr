const g = G$("Pranav", "Yeole");

g.greet().setLang("es").greet(true).log();

$("#sub-btn").click(() => {
  const loginGreeter = G$("Pranav", "Yeole");
  $("#form-container").hide();
  loginGreeter
    .setLang($("#language").val())
    .HTMLGreeting("#text-container span", true)
    .log();
});
