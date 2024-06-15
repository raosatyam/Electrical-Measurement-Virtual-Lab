package com.example.wheatstone;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

public class SimulationFragment extends Fragment {
    private Button simulatorButton;
    private String simulatorUrl;

    public SimulationFragment() {
        // Required empty public constructor
    }

    // Create a new instance of the fragment
    public static SimulationFragment newInstance(JSONObject experiment) {
        SimulationFragment fragment = new SimulationFragment();
        Bundle args = new Bundle();
        args.putString("experiment", experiment.toString());
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            try {
                JSONObject experiment = new JSONObject(getArguments().getString("experiment"));
                simulatorUrl = experiment.optString("simulator");
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_simulation, container, false);

        simulatorButton = view.findViewById(R.id.simulatorButton);

        simulatorButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openSimulator();
            }
        });

        return view;
    }

    private void openSimulator() {
        if (simulatorUrl != null && !simulatorUrl.isEmpty()) {
            Intent intent = new Intent(requireContext(), SimulatorActivity.class);
            intent.putExtra("simulatorUrl", simulatorUrl);
            startActivity(intent);
        }
    }
}