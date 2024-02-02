let aJoy: number[] = []
let iFahrstrecke = 0
basic.forever(function () {
    qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
    aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
    radio.setGroup(240)
    radio.setTransmitPower(7)
    iFahrstrecke = 0
})
