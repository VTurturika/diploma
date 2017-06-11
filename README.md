# Bulding APK

1. Download [Android SDK](https://dl.google.com/android/repository/sdk-tools-darwin-3859397.zip)

2. [Install](https://stackoverflow.com/questions/31374085/installing-adb-on-mac-os-x) ``adb`` CLI tool (for watching logs from phone)

3. Install all TypeScript dependencies
    ```
    npm install
    ```

4. Check ``JAVA_HOME`` environment variable
    ```
    echo $JAVA_HOME
    ```

5. Set up ``ANDROID_HOME`` environment variable
    ```
    export ANDROID_HOME=path/to/sdk
    export PATH=${PATH}:$ANDROID_HOME/tools
    ```
6. Enable cordova android support
    ```
    cordova platform add android
    ```

7. Connect USB cable and enable Debug mode on phone

8. Build apk and run it on phone
    ```
    ionic run android
    ```
9. For watching phone logs use
    ```
    adb logcat | grep INFO:CONSOLE
    ```
