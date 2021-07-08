
function load_image() {
    //player,gem,virus

    virus_img = new Image();
    virus_img.src = "Assets/v1.png"
    player_img = new Image();
    player_img.src = "Assets/superhero.png"
    gem_img = new Image();
    gem_img.src = "Assets/gemm.png"
}

function init() {
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    canvas.width = W;
    canvas.height = H;
    game_over = false;

    pen = canvas.getContext('2d');

    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 30,
    };
    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40,
    };
    enemy = [e1, e2, e3];

    player = {
        x: 20,
        y: H / 2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 100,

    };

    gem = {
        x: W - 100,
        y: H / 2,
        w: 60,
        h: 60,
    };


    document.addEventListener('mousedown', function () {
        player.moving = true;
    });
    document.addEventListener('mouseup', function () {
        player.moving = false;
    });

    
}

function isOverlap(rect1,rect2) {
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {
        // collision detected!
        return true;
    }
    else{
        return false;
    }
    
}

function update() {

    

    if (player.moving == true) {
        player.x += player.speed;
        player.health += 20;
    }
    if(isOverlap(player,gem)){
        alert("you won!!");
        game_over = true;
        return;
    }

    for(let i=0;i<enemy.length;i++){
        if(isOverlap(player,enemy[i])){
            player.health -=50;
            if(player.health<=0){
                alert("Game Over");
                game_over = true;
            }
        }
    }
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y < 0 || enemy[i].y > H - enemy[i].h) {
            enemy[i].speed *= -1;
        }
    }
}

function draw() {

    pen.clearRect(0, 0, W, H);
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);


    for (let i = 0; i < enemy.length; i++) {

        pen.drawImage(virus_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    pen.fillStyle = "white";
    pen.fillText("Score: " + player.health,10,10);

}

function gameloop() {
    draw();
    update();
    if(game_over == true){
        clearInterval(f);
    }
    
}

load_image();
init();
var f = setInterval(gameloop, 100);