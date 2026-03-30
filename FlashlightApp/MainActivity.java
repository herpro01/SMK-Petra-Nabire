package com.flash.lampu;

import android.hardware.camera2.CameraManager;
import android.os.Bundle;
import android.content.Context;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    CameraManager cameraManager;
    String cameraId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnOn = findViewById(R.id.btnOn);
        Button btnOff = findViewById(R.id.btnOff);

        cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);

        try {
            cameraId = cameraManager.getCameraIdList()[0];
        } catch (Exception e) {
            e.printStackTrace();
        }

        btnOn.setOnClickListener(v -> {
            try {
                cameraManager.setTorchMode(cameraId, true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        btnOff.setOnClickListener(v -> {
            try {
                cameraManager.setTorchMode(cameraId, false);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
