class Vehicle {
    constructor(x, y) {
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -2);
      this.position = createVector(x, y);
      this.r = 4;
      this.maxspeed = 5;
      this.maxforce = 0.5;

      this.health = 1;

      this.dna = [
          random(-5,5),
          random(-5,5)
      ];
    }
  
    // Method to update location
    update() {

        this.health -= 0.01;

      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelerationelertion to 0 each cycle
      this.acceleration.mult(0);
    }
  
    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }

    dead() {
        return (this.health < 0);
    }

    behaviors(good, bad) {
        let steerG = this.eat(good, 0.1);
        let steerB = this.eat(bad, -0.5);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    eat(list,nutrition) {
        let record = Infinity;
        let closestIndex = -1;
        list.forEach((e,i)=>{
            let d = this.position.dist(e);
            if (d < record) {
                record = d;
                closestIndex = i;
            }
        });

        if (record < 5) {
            list.splice(closestIndex, 1);
            this.health += nutrition;
        } else if (closestIndex > -1) {
            return this.seek(list[closestIndex]);
        }

        return createVector(0,0);

    }
  
    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
  
      var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  
      // Scale to maximum speed
      desired.setMag(this.maxspeed);
  
      // Steering = Desired minus velocity
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force
  
      //this.applyForce(steer);
      return steer;
    }
  
    display() {

        let gr = color (0,255,0);
        let rd = color (255,0,0);
        let col = lerpColor(rd,gr, this.health);

      // Draw a triangle rotated in the direction of velocity
      var theta = this.velocity.heading() + PI / 2;
      fill(col);
      stroke(col);
      strokeWeight(1);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);

      stroke(0,255,0);
      line(0,0,0, -this.dna[0]*20);
      stroke(255,0,0);
      line(0,0,0, -this.dna[1]*20);

      pop();
    }
  }