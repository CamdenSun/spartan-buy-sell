import javax.swing.JFrame;

public class GraphicsRunner{
	public static void main(String[] args){
		JFrame frame = new JFrame("Camden_Sun_Scenery");
		Scenery canvas = new Scenery();
		frame.add(canvas);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.pack();
		frame.setVisible(true);
	}
}
