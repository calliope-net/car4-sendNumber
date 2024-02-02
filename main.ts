let aJoy: number[] = []
let iFahrstrecke = 0
let iMotor = 0
let iServo = 0
basic.forever(function () {
    qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
    aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
    radio.setGroup(240)
    radio.setTransmitPower(7)
    iFahrstrecke = 0
})
loops.everyInterval(400, function () {
    if (iFahrstrecke == 0) {
        basic.setLedColor(0x007fff)
        aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
        iMotor = aJoy[0]
        qwiicjoystick.comment("0 Motor 0..128..255")
        iServo = aJoy[1]
    } else {
    	
    }
})
