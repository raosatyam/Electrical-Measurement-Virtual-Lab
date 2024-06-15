package com.example.wheatstone;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class TheoryFragment extends Fragment {
    private TextView prevTheoryTextView;
    private ImageView imgTheoryImageView;
    private TextView nextTheoryTextView;

    private JSONObject experiment;

    public TheoryFragment() {
        // Required empty public constructor
    }

    // Create a new instance of the fragment
    public static TheoryFragment newInstance(JSONObject experiment) {
        TheoryFragment fragment = new TheoryFragment();
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
                experiment = new JSONObject(getArguments().getString("experiment"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_theory, container, false);

        prevTheoryTextView = view.findViewById(R.id.prevTheoryTextView);
        imgTheoryImageView = view.findViewById(R.id.imgTheoryImageView);
        nextTheoryTextView = view.findViewById(R.id.nextTheoryTextView);

        try {
            // Set previous theory text
            prevTheoryTextView.setText(experiment.getJSONObject("theory").getString("prev"));

            // Set image
            String imageName = experiment.getJSONObject("theory").getString("image");
            int imageResource = getResources().getIdentifier(imageName, "drawable", getContext().getPackageName());
            imgTheoryImageView.setImageResource(imageResource);

            // Set next theory text
            nextTheoryTextView.setText(experiment.getJSONObject("theory").getString("next"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return view;
    }
}