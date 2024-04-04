#include<bits/stdc++.h>
#include<iostream>
using namespace std;

#include <map>

class ReservationSystem {
private:
    map<string, int> roomCounts;
    map<string, int> equipmentCounts;
    string reservationMessage;

public:
    ReservationSystem() {
        // Initialize room counts
        roomCounts["Normal"] = 50;
        roomCounts["Oxygen"] = 50;
        roomCounts["ICU"] = 20;

        // Initialize equipment counts
        equipmentCounts["FlatBeds"] = 80;
        equipmentCounts["ReclinerBeds"] = 100;
        equipmentCounts["Ventilators"] = 20;
        equipmentCounts["OxygenCylinders"] = 110;
        equipmentCounts["NonRebreatherMasks"] = 200;
        equipmentCounts["NormalMasks"] = 120;
    }

    void reserveRoom(const string& roomType) {
        if (roomType == "ICU") {
            if (roomCounts["ICU"] > 0) {
                roomCounts["ICU"]--;
                equipmentCounts["Ventilators"]--;
                equipmentCounts["OxygenCylinders"]--;
                equipmentCounts["ReclinerBeds"]--;
                reservationMessage = "01 ICU room (with 1 ventilator + 1 oxygen cylinder + 1 recliner bed) reserved.";
            } else {
                reservationMessage = "Sorry, no ICU rooms could be reserved.";
            }
        } else if (roomType == "Oxygen") {
            if (roomCounts["Oxygen"] > 0) {
                roomCounts["Oxygen"]--;
                equipmentCounts["OxygenCylinders"] -= 2;
                equipmentCounts["ReclinerBeds"]--;
                equipmentCounts["NonRebreatherMasks"] -= 2;
                reservationMessage = "01 Oxygen room (2 oxygen cylinder + 1 recliner bed + 2 non rebreather masks) reserved.";
            } else {
                reservationMessage = "Sorry, no Oxygen rooms could be reserved.";
            }
        } else if (roomType == "Normal") {
            if (roomCounts["Normal"] > 0) {
                roomCounts["Normal"]--;
                equipmentCounts["FlatBeds"]--;
                equipmentCounts["NormalMasks"] -= 2;
                reservationMessage = "01 Normal room (1 normal bed + 2 normal masks ) reserved.";
            } else {
                reservationMessage = "Sorry, no Normal rooms could be reserved.";
            }
        }
    }

    void displayStatus() {
        cout << "Room Status:\n";
        for (const auto& room : roomCounts) {
            cout << room.first << " Rooms: " << room.second << endl;
        }

        cout << "\nEquipment Status:\n";
        for (const auto& equipment : equipmentCounts) {
            cout << equipment.first << ": " << equipment.second << endl;
        }
    }

    void displayReservationMessage() {
        cout << reservationMessage << endl;
    }
};

    int main() {
    ReservationSystem reservationSystem;

    cout << "Reservation System\n\n";

    int choice = 0; // Initialize choice to a non-exit value

    while (choice != 4) {
        cout << "Enter your choice:\n";
        cout << "1. Reserve Normal Room\n";
        cout << "2. Reserve Oxygen Room\n";
        cout << "3. Reserve ICU Room\n";
        cout << "4. Exit\n";
        cin >> choice;

        switch (choice) {
            case 1:
                reservationSystem.reserveRoom("Normal");
                break;
            case 2:
                reservationSystem.reserveRoom("Oxygen");
                break;
            case 3:
                reservationSystem.reserveRoom("ICU");
                break;
            case 4:
                cout << "Exiting...\n";
                break; // Exit the loop
            default:
                cout << "Invalid choice. Please try again.\n";
        }

        if (choice != 4) {
            cout << "\nReservation Details:\n";
            reservationSystem.displayReservationMessage();

            cout << "\nUpdated Status:\n";
            reservationSystem.displayStatus();
        }
    }

    return 0;
}

    
