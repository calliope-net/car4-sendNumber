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
        iServo = Math.round(Math.map(iServo, 0, 255, 135, 45))
        qwiicjoystick.comment("1 Servo 0..128..255 -> 45..90..135")
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z0, iMotor)
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z1, iServo)
        qwiicjoystick.setSendeZahl(NumberFormat.Int8LE, qwiicjoystick.eOffset.z2, 0)
        radio.sendNumber(qwiicjoystick.getSendeZahl())
        basic.turnRgbLedOff()
    }
})
