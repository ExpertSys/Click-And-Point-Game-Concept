$(document).ready(function(){
  function NPC(npcName, health){
      this.npcName = npcName;
      this.health = health;
  }

  NPC.prototype = {
      active: 1,
      damage: 10
  };

  let Monster = new NPC("Ghoul", 25);
  let Zombie = new NPC("Zombie", 10);

  let Player = {
        damage: 0,
        x: 2,
        y: 1
  };

  let Shop = {
      x: 4,
      y: 2,
    };

  let World = {
      grid: "<table align='center'>",
      x: [],
      y: [],
      id: 0,
      taken: 0,
      inBattle: 0,
      newCoordinates: [],
      map: [
        [0,0,0],
        [0,0,0],
        [0,0,0]],

      drawMap: function(){
        for(var i = 0; i < this.map.length; i++) {
          this.x[i] = [];
          World.grid += "<tr>";
          for(var j = 0; j < this.map[i].length; j++){
            this.y[j] = [];
            World.grid += `<td id="${World.id}" data-occupied="10" class='square'">`;
            this.id++;
            World.spawnPlayer();
            World.spawnEnemies();
            if(this.map[i][j] !== 0){
                World.grid += this.map[i][j];
            }
            World.grid += "</td>";
          }
          World.grid += "</tr>";
        }
          World.grid += "</table>";
        $('#map').append(World.grid);
      },

      spawnPlayer: function(){
        $(".square").on('click', function(){
            var playerLoc = Player.character;
            var coordinates = 9;
            var newCoordinates = 0;
            var enemySpawns = [8,0];
            var myCoords = [];
            var coords = {
                0: "[0][0]", 1: "[0][1]", 2: "[0][2]",
                3: "[1][0]", 4: "[1][1]", 5: "[1][2]",
                6: "[2][0]", 7: "[2][1]", 8: "[2][2]",
            };

            for (var prop in coords) {
                if (coords.hasOwnProperty(prop)) {
                    newCoordinates = coords[$(this).attr('id')];
                    if(newCoordinates){
                        newCoordinates;
                    }
                }
            }

            for(var y = 0; y < $(".square").length; y++){
                myCoords.push(y);
            }

            if($(this).attr("data-occupied") >-1 && $(this).attr("data-occupied") != 8){
                $(".console").prepend("<span>Command: Player has moved to coordinate: </span>" + `<span class='newMove'>${newCoordinates}</span><br/>`);
                $(this).addClass("player");
                $('.square').not($(this)).removeClass('player');
                $(this).attr("data-occupied", myCoords[$(this).attr('id')]);
            }

            for(var e = 0; e < enemySpawns.length; e++){
                if($(this).attr("data-occupied") == enemySpawns[e]){
                    if(enemySpawns[e] == 8){
                        World.fightGhoul();
                    } else if(enemySpawns[e] == 0){
                        World.fightZombie();
                    }
                }
            }
        });
      },

      spawnEnemies: function(){
          World.map[2][2] = `Name: ${Monster.npcName} <br> Health:${Monster.health}<br> Damage:${Monster.damage}`;
          World.map[0][0] = `Name: ${Zombie.npcName} <br> Health:${Zombie.health}<br> Damage:${Zombie.damage}`;
      },

      fightGhoul: function(){
          var healthCounter = Monster.health;
          var playerDamage = (Math.floor(Math.random() * 4));
          Player.damage = playerDamage;

          $(".console").prepend("<span class='newMove'>Monster Health: "+ healthCounter +"</span><br>");
          for(var h = 0; h < (Monster.health - Monster.health) + 1; h++){
          $(".console").prepend("<span>Player has attacked "+ Monster.npcName +" for: </span>" + `<span class='taken'>${Player.damage} damage</span><br/>`);
          healthCounter = Monster.health -= playerDamage;
          $(".console").append("<span class='newMove'>Monster Health: "+ healthCounter +"</span><br>");
          if(healthCounter <= 0){
              Monster.health = "You've already defeated " + Monster.npcName;
          }
        }
      },

      fightZombie: function(){
          var healthCounter = Zombie.health;
          var playerDamage = (Math.floor(Math.random() * 6));
          Player.damage = playerDamage;

          $(".console").prepend("<span class='newMove'>Monster Health: "+ healthCounter +"</span><br>");
          for(var h = 0; h < (Zombie.health - Zombie.health) + 1; h++){
          $(".console").prepend("<span>Player has attacked "+ Zombie.npcName +" for: </span>" + `<span class='taken'>${Player.damage} damage</span><br/>`);
          healthCounter = Zombie.health -= playerDamage;
          $(".console").append("<span class='newMove'>Monster Health: "+ healthCounter +"</span><br>");

          if(healthCounter <= 0){
              Zombie.health = "You've already defeated " + Zombie.npcName;
          }
        }
      }
  };
    World.drawMap();
    World.spawnPlayer();
    World.spawnEnemies();
});
