var jsPsychCustomDeblur = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "jsPsychCustomDeblur",
      parameters: {
        stim: {
          type: jspsych.ParameterType.IMAGE,
          default: undefined,
        }
      },
    };

    /**
     * jsPsychCustomDeblur
     *     *
     * @author Kai, Liam, Rachel, Zephan
     */
    class jsPsychCustomDeblur {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      
      trial(display_element, trial) {

        var img1 = trial.stim.image1;
        var img2 = trial.stim.image2;
        var img3 = trial.stim.image3;

        display_element.innerHTML = `	
        <style>
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

          .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 50px;
          }
              
          .button {
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            margin-top: 20px;
            border-radius: 5px;
            background-color: #4f5250;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .button:hover {
            background-color: #6f766f;
          }

          .image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .image-wrapper img {
            width: 250px;
            height: 166px;
            filter: blur(0px);
            transition: filter 0.0s ease;
          }
          </style>

        <div id="header">
            <p id="click-tracker"><span class="click-tracker-label">Clicks remaining: </span><span id="clicks-remaining">10<br></span></p>
        </div>
        
        <div class="container">

          <div class="image-wrapper">
            <img src=${img1} alt="Image 1">
            <button class="button" id="button1">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src=${img2} alt="Image 2">
            <button class="button" id="button2">Reduce Blur</button>
          </div>

          <div class="image-wrapper">
            <img src=${img3} alt="Image 3">
            <button class="button" id="button3">Reduce Blur</button>
          </div>

        </div>

        <button class="button" id="continue">Continue</button>
      
      `

      const buttons = document.querySelectorAll('.button:not(#continue)');
      const images = document.querySelectorAll('.image-wrapper img');
      const continueButton = document.querySelector('#continue');
      const blurStep = 1;
      const clicksRemainingElement = document.getElementById("clicks-remaining");

      var totalClicks = 10;
      clicksRemainingElement.textContent = totalClicks;
      var clicks = [0,0,0];
      var blurs = [trial.stim.blur1, trial.stim.blur2, trial.stim.blur3];

      // these three values are our easy, med, hard variants
      var difficulty_asmts = jsPsych.randomization.shuffle([3,5,8]);
      // console.log(difficulty_asmts);
    
      images.forEach((image,index) => {
        // console.log("baseline = " + blurs[index]);
        blurs[index] += difficulty_asmts[index];
        images[index].style.filter = `blur(${blurs[index]}px)`;
        // console.log("updated = " + blurs[index]);
      })

      function resetButtons(newBlur) {
        buttons.forEach((button) => {
          button.disabled = true;
          button.style.opacity = "0.15";
          button.style.cursor = "default";
            if (totalClicks > 0){
              setTimeout(() => {
                button.disabled = (newBlur === 0) ? true : false;
                button.style.opacity = (newBlur === 0) ? "0.0" : "1.0";
                button.style.cursor = "pointer";
              }, 750);
              button.style.visibility = (newBlur === 0) ? "hidden" : "visible";
            } else {
              button.disabled = true;
              button.style.opacity = "0.0";
              button.style.visibility = "hidden";
            }
        })
      }

      function deactivateButtons() {
        buttons.forEach((button) => {
            button.disabled = true;
            button.style.opacity = "0.0";
            button.style.visibility = "hidden";
            console.log("HEREEE");
          }
        )
      }

      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let currentBlur = blurs[index];
            // console.log(currentBlur);
            clicks[index]++;
            totalClicks--;
            // console.log("Total clicks: " + totalClicks);
            clicksRemainingElement.textContent = totalClicks;

            let newBlur = currentBlur - blurStep;
              if (newBlur < 0) {
                newBlur = 0;
              }

              console.log(newBlur);
            
            blurs[index] = newBlur;
            images[index].style.filter = `blur(${newBlur}px)`;
            // button.innerHTML = `Reduce Blur`;
            resetButtons.apply(button);
          }
        )
      });

        var trial_data = {
          clicks: clicks,
          blur: blurs,
          orig_blur: [trial.stim.blur1, trial.stim.blur2, trial.stim.blur3],
          diff_asmts: difficulty_asmts
        };

      continueButton.addEventListener('click', () => {
        console.log(clicks[1]);
        this.jsPsych.finishTrial(trial_data);
      });
      }
    }
    jsPsychCustomDeblur.info = info;
  
    return jsPsychCustomDeblur;
  })(jsPsychModule);