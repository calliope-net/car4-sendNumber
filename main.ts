function fServo (pJoy: number) {
    if (lcd16x2rgb.between(pJoy, 496, 512)) {
        qwiicjoystick.comment("Ruhestellung soll 512 ist 498 auf 512 = 90° anpassen")
        return 90
    } else if (pJoy < 32) {
        qwiicjoystick.comment("Werte < 32 wie 0 behandeln (max links)")
        return 45
    } else if (pJoy > 991) {
        qwiicjoystick.comment("Werte > 991 wie 1023 behandeln (max rechts)")
        return 135
    } else {
        qwiicjoystick.comment("Werte von 32 bis 991 auf 46° bis 134° verteilen")
        return Math.round(Math.map(pJoy, 32, 991, 46, 134))
    }
}
let iServo = 0
let iMotor = 0
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
qwiicjoystick.beimStart(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20))
let aJoy = qwiicjoystick.readArray(qwiicjoystick.qwiicjoystick_eADDR(qwiicjoystick.eADDR.Joystick_x20), qwiicjoystick.eBereich.B_0_255)
radio.setGroup(240)
radio.setTransmitPower(7)
let iFahrstrecke = 0
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
