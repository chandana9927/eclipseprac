package scenarios;

public class Occurance {

	public static void main(String[] args) {
		String str = "aabbacdbdc";
		int a[] = new int[123];
		for(int i = 0; i < str.length(); i++) {
			char ch = str.charAt(i);
			a[ch]++;
		}
		for(int i = 0; i < a.length; i++) {
			if(a[i]>0) {
				System.out.print((char)i+""+a[i]);
			}
		}

	}

}
