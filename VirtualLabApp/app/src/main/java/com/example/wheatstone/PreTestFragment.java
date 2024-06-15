package com.example.wheatstone;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class PreTestFragment extends Fragment {
    private LinearLayout pretestLayout;
    private Button submitButton;
    private JSONArray pretestArray;
    public PreTestFragment() {
        // Required empty public constructor
    }

    public static PreTestFragment newInstance(JSONArray pretestArray) {
        PreTestFragment fragment = new PreTestFragment();
        Bundle args = new Bundle();
        args.putString("pretestArray", pretestArray.toString());
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            try {
                pretestArray = new JSONArray(getArguments().getString("pretestArray"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_pretest, container, false);
        pretestLayout = view.findViewById(R.id.pretestLinearLayout);
        submitButton = view.findViewById(R.id.submitPreTestButton);

        submitButton.setBackgroundTintList(getResources().getColorStateList(R.color.blue_dark));

        try {
            displayPretestQuestions();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkAnswers();
            }
        });

        return view;
    }

    private void displayPretestQuestions() throws JSONException {
        for (int i = 0; i < pretestArray.length(); i++) {
            JSONObject questionObject = pretestArray.getJSONObject(i);

            String question = questionObject.getString("question");
            JSONObject answersObject = questionObject.getJSONObject("answers");
            String correctAnswer = questionObject.getString("correctAnswer");

            // Create a new layout params for margin
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            );
            layoutParams.setMargins(0, 40, 0, 0); // Set top margin to 30dp

            TextView questionTextView = new TextView(requireContext());
            questionTextView.setText(question);
            questionTextView.setTextColor(getResources().getColor(R.color.black));
            questionTextView.setLayoutParams(layoutParams); // Apply layout params to questionTextView
            pretestLayout.addView(questionTextView);

            RadioGroup radioGroup = new RadioGroup(requireContext());
            radioGroup.setOrientation(LinearLayout.VERTICAL);

            RadioButton[] radioButtons = new RadioButton[answersObject.length()];
            String[] answerKeys = {"a", "b", "c", "d"};

            for (int j = 0; j < answersObject.length(); j++) {
                radioButtons[j] = new RadioButton(requireContext());
                String answerKey = answerKeys[j];
                radioButtons[j].setText(answersObject.getString(answerKey));
                radioButtons[j].setTextColor(getResources().getColor(R.color.gray));
                radioButtons[j].setId(j);
                radioGroup.addView(radioButtons[j]);
            }

            pretestLayout.addView(radioGroup);
        }
    }


    private void checkAnswers() {
        int correctCount = 0;

        for (int i = 0; i < pretestArray.length(); i++) {
            RadioGroup radioGroup = (RadioGroup) pretestLayout.getChildAt(i * 2 + 1);
            int selectedRadioButtonId = radioGroup.getCheckedRadioButtonId();

            if (selectedRadioButtonId != -1) {
                RadioButton selectedRadioButton = radioGroup.findViewById(selectedRadioButtonId);
                String selectedAnswer = selectedRadioButton.getText().toString();

                try {
                    JSONObject questionObject = pretestArray.getJSONObject(i);
                    String correctAnswer = questionObject.getString("correctAnswer");

                    // Get the correct option ID
                    int correctOptionId = -1;
                    for (int j = 0; j < radioGroup.getChildCount(); j++) {
                        RadioButton radioButton = (RadioButton) radioGroup.getChildAt(j);
                        if (radioButton.getText().toString().equals(questionObject.getJSONObject("answers").getString(correctAnswer))) {
                            correctOptionId = radioButton.getId();
                            break;
                        }
                    }

                    // Color the options based on correctness
                    if (selectedAnswer.equals(questionObject.getJSONObject("answers").getString(correctAnswer))) {
                        correctCount++;
                        selectedRadioButton.setTextColor(getResources().getColor(android.R.color.holo_green_dark));
                    } else {
                        selectedRadioButton.setTextColor(getResources().getColor(android.R.color.holo_red_dark));
                        if (correctOptionId != -1) {
                            RadioButton correctRadioButton = radioGroup.findViewById(correctOptionId);
                            correctRadioButton.setTextColor(getResources().getColor(android.R.color.holo_green_dark));
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }

        Toast.makeText(requireContext(), "You got " + correctCount + " out of " + pretestArray.length() + " questions correct.", Toast.LENGTH_SHORT).show();
    }

}