const Game = function () {
  let level = 0;
  let time = 3;
  let remaining = 0;
  let timeVar;
  let timeVare;
  let isWin = true;

  const randomColor = function () {
    const r = Math.floor(Math.random() * Math.floor(255));
    const b = Math.floor(Math.random() * Math.floor(255));
    const g = Math.floor(Math.random() * Math.floor(255));
    if (r == 0 && b == 0 && g == 128) {
      return randomColor();
    }
    return `rgb( ${r}, ${g}, ${b})`;
  };

  const addFrogs = function () {
    for (let i = 0; i < level; i++) {
      const divSize = Math.floor(30 + Math.random() * 150);
      const div = $(
        `<div class="frog" width="${divSize}" height="${divSize}"><i class="fas fa-frog"></i></div>`
      );
      // const left = Math.floor(Math.random() * ($('#playGround').width() - $(this).width()))
      // const top = Math.floor(Math.random() * ($('#playGround').height() - $(this).height()))
      div.css("color", randomColor());
      div.css("left");
      div.css({
        left: Math.floor(Math.random() * ($("#playGround").width() - divSize)),
        top: Math.floor(Math.random() * ($("#playGround").height() - divSize)),
        color: randomColor(),
        "font-size": `${Math.floor(Math.random() * divSize)}px`,
      });
      $("#playGround").append(div);
    }
  };
  const newGame = function () {
    // $("#playGround div").remove();

    $("#catch").attr("disabled", true);
    if (isWin) {
      $("#noMore").hide();
      level += 1;
      time += 1;
    }
    remaining = level;
    addFrogs();
    $("#number").text(level);
    $("#leve").text(level);
    $("#catch").text("Catch the frogs");
    let timeLeft = time;
    timeVare = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft >= 0) {
        $("#time").text(timeLeft);
        $("#timer").css("color", randomColor());
      }
    }, 1000);
    timeVar = setTimeout(function () {
      if (remaining != 0) {
        isWin = false;

        $("#playGround").empty();
        alert("Oops, you have lost");
        clearInterval(timeVare);
        $("#catch").removeAttr("disabled");

        newGame();
      }
    }, time * 1000);
  };
  const remove = function (frog) {
    remaining -= 1;
    if (remaining == 0) {
      $("#catch").removeAttr("disabled");
      isWin = true;
      frog.remove();
      clearTimeout(timeVar);
      clearInterval(timeVare);
      // $("#noMore").text("You won, click start for the next level")
      // $("#noMore").show()
      $("#number").text("-");
      newGame();
    } else {
      frog.remove();
      $("#number").text(remaining);
    }
  };

  return { newGame, remove };
};

const game = Game();
// game.addFrogs(20);

$("#catch").on("click", function () {
  game.newGame();
});
$("#playGround").on("click", ".frog", function () {
  game.remove($(this));
});
