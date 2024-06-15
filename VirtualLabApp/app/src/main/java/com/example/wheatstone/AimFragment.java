package com.example.wheatstone;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class AimFragment extends Fragment {
    private JSONObject experimentData;

    public AimFragment() {
        // Required empty public constructor
    }

    public static AimFragment newInstance(JSONObject experimentData){
        AimFragment fragment = new AimFragment();
        Bundle args = new Bundle();
        args.putString("experiment_data", experimentData.toString());
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            try {
                experimentData = new JSONObject(getArguments().getString("experiment_data"));
            }
            catch (JSONException e){
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_aim, container, false);

        TextView aimTextView = view.findViewById(R.id.aimTextView);

        if(experimentData != null){
            try {
                String aim = experimentData.getString("aim");
                aimTextView.setText(aim);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
//        return inflater.inflate(R.layout.fragment_aim, container, false);
        return view;
    }
}