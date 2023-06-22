FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y wget unzip openjdk-8-jdk


RUN wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
    && unzip -qq android-sdk.zip -d /opt/android-sdk \
    && rm android-sdk.zip

# Set up environment variables
ENV ANDROID_SDK_ROOT="/opt/android-sdk"
ENV ANDROID_HOME="/opt/android-sdk"
ENV PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin"

RUN yes | sdkmanager --licenses

RUN sdkmanager --install "extras;google;google_play_services" "extras;google;instantapps" "emulator"
RUN sdkmanager --install "system-images;android-30;google_apis;x86_64"
RUN sdkmanager --install "platforms;android-30" "platform-tools"

RUN avdmanager create avd -n my_avd --package "system-images;android-30;google_apis;x86_64" --device "pixel_xl"

CMD ["emulator", "-avd", "my_avd", "-ports", "5556,5557", "-grpc", "8554", "-no-window", "-skip-adb-auth", "-no-snapshot-save", "-wipe-data", "-no-boot-anim"]
