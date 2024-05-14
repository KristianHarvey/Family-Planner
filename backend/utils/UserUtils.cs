
public static class UserUtility {
    public static int GetRandomUserNameNumber() {
        int _min = 1000;
        int _max = 9999;
        Random _rdm = new Random();
        return _rdm.Next(_min, _max);
    }
}